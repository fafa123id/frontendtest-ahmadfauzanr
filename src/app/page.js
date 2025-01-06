'use client'
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import PostGrid from "../components/Card";

const IdeasPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState("-published_at");
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPage(parseInt(params.get("page")) || 1);
    setPerPage(parseInt(params.get("size")) || 10);
    setSort(params.get("sort") || "-published_at");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("size", perPage.toString());
    params.set("sort", sort);
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
  }, [page, perPage, sort]);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://suitmedia-backend.suitdev.com/api/ideas",
        {
          params: {
            "page[number]": page,
            "page[size]": perPage,
            "append[]": ["small_image", "medium_image"],
            sort,
          },
        }
      );
      setPosts(response.data.data);
      setTotalItems(response.data.meta.total);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, sort]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const totalPages = Math.ceil(totalItems / perPage);
  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, totalItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <p className="text-gray-600 mb-4 md:mb-0">
          Showing {startItem} - {endItem} of {totalItems}
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 whitespace-nowrap">
              Show per page:
            </span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="appearance-none border rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 whitespace-nowrap">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none border rounded-full px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              <option value="-published_at">Latest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
        </div>
      ) : (
        <PostGrid posts={posts} />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default IdeasPage;

