import { createContext, useContext, useState, useEffect } from "react";

const CRMContext = createContext();
export const useCrmContext = () => useContext(CRMContext);

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export function CRMProvider({ children }) {
  const [agents, setAgents] = useState([]);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // ✅ Fetch Agents
  const fetchSalesAgent = async () => {
    try {
      const response = await fetch("https://crm-backend-sooty-one.vercel.app/v1/agents");
      const agentNames = await response.json();
      setAgents(agentNames || []);
    } catch (error) {
      console.log("Agents not found!", error);
    }
  };

  useEffect(() => {
    fetchSalesAgent();
    // fetchComments();
  }, []);


  // ✅ Add New Lead
  const addLead = async (leadData) => {
    try {
      const response = await fetch("https://crm-backend-sooty-one.vercel.app/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();
      console.log("Lead API Response:", result);
      return result;
    } catch (error) {
      console.log("Failed to add lead:", error);
      return null;
    }
  };

    // ✅ Fetch Comments
  // const fetchComments = async () => {
  //   try {
  //     setLoadingComments(true);
  //     const res = await fetch("https://crm-backend-sooty-one.vercel.app/v1/comments");
  //     const data = await res.json();
  //     setComments(data);
  //   } catch (err) {
  //     console.error("Error fetching comments:", err);
  //   } finally {
  //     setLoadingComments(false);
  //   }
  // };

  // ✅ Add New Comment
  // const addComment = async (commentData) => {
  //   try {
  //     const response = await fetch("https://crm-backend-sooty-one.vercel.app/v1/comments", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(commentData),
  //     });

  //     if (!response.ok) throw new Error("Failed to add comment");

  //     const savedComment = await response.json();
  //     setComments((prev) => [...prev, savedComment]);
  //     return savedComment;
  //   } catch (error) {
  //     console.error("Error posting comment:", error);
  //     return null;
  //   }
  // };

  return (
    <CRMContext.Provider
      value={{
        agents,
        addLead,
        comments,
        // fetchComments,
        // addComment,
        loadingComments,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
}
