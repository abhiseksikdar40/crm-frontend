import { createContext, useContext, useState, useEffect } from "react";

const CRMContext = createContext();
export const useCrmContext = () => useContext(CRMContext);

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setData(result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

export function CRMProvider({ children }) {
  const [agents, setAgents] = useState([]);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

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
  }, []);

  const addAgent = async (agentsData) => {
    try {
      const response = await fetch("https://crm-backend-sooty-one.vercel.app/v1/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agentsData)
      })

      const newAgent = await response.json()
      return newAgent
    } catch (error) {
      console.log("Failed to add agent:", error)
      return null
    }
  }

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

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await fetch("https://crm-backend-sooty-one.vercel.app/v1/comments");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  const addComment = async (commentData) => {
    try {
      const response = await fetch("https://crm-backend-sooty-one.vercel.app/v1/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) throw new Error("Failed to add comment");

      const savedComment = await response.json();
      setComments((prev) => [...prev, savedComment]);
      return savedComment;
    } catch (error) {
      console.error("Error posting comment:", error);
      return null;
    }
  };

  const updateLead = async (leadId, updatedData) => {
  try {
    const response = await fetch(`https://crm-backend-sooty-one.vercel.app/v1/leads/${leadId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update lead");
    }

    const result = await response.json();
    return result.leads || result;
  } catch (error) {
    console.error("Error updating lead:", error);
    return null;
  }
};




  return (
    <CRMContext.Provider
      value={{
        agents,
        addAgent,
        addLead,
        comments,
        fetchComments,
        addComment,
        loadingComments,
        updateLead
      }}
    >
      {children}
    </CRMContext.Provider>
  );
}