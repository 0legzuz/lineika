import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Test, GetTestResponse } from "../../types";
import styled from "styled-components";
import TestCard from "../TestCard/TestCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TestList: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getTests()
      .then((res) => {
        setTests(res.tests);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to load tests", e);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          {tests.map((test) => (
            <TestCard key={test.id} test={test} role="student" userId="1" />
          ))}
        </Container>
      )}
    </div>
  );
};

export default TestList;
