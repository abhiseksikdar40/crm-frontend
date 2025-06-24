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

  return (
    <CRMContext.Provider value={{ agents, addLead }}>
      {children}
    </CRMContext.Provider>
  );
}
