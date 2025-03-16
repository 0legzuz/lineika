import React, { useState, useEffect } from "react";
import "./TestSectionStyles.tsx";
import styled from "styled-components";
import { api } from "../../services/api";
import { Test, LeaderboardEntry } from "../../types"; // Import the new type
import TestCard from "../TestCard/TestCard";
import ActionButton from "../ui/ActionButton/ActionButton.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Section = styled.div`
  margin-top: 50px;
  border-radius: 8px;
  font-family: "Raleway", sans-serif;
  width: 100%;
`;

const TestList = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 20px 0;
`;

const LeaderboardSection = styled.div`
  margin-top: 20px;
`;

const LeaderboardList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LeaderboardItem = styled.li<{ isCurrentUser: boolean }>`
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: ${(props) =>
    props.isCurrentUser ? "#e0ffe0" : "transparent"};
`;
const EllipsisItem = styled.li`
  padding: 10px;
  text-align: center;
  font-style: italic;
  color: gray;
`;

interface TestSectionProps {
  role: "student" | "teacher" | "moderator";
  userId: string;
}

const TestSection: React.FC<TestSectionProps> = ({ role, userId }) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]); // New state for leaderboard
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log("TestSection: Fetching tests..."); // Log 4
    setLoading(true);
    api
      .getTests()
      .then((res) => {
        console.log("TestSection: Tests loaded successfully", res.tests); // Log 5
        setTests(res.tests);
        setLoading(false);
      })
      .catch((e) => {
        console.error("TestSection: Failed to load tests ", e); // Log 6
        setLoading(false);
      });
    // Fetch leaderboard data
    console.log("TestSection: Fetching leaderboard..."); // Log 7
    api
      .getLeaderboard()
      .then((data) => {
        console.log("TestSection: Leaderboard loaded successfully", data); // Log 8
        // Convert averagescore and totalteststaken to number
        const formattedLeaderboard = data.map((item) => ({
          ...item,
          averagescore: Number(item.averagescore),
          totalteststaken: Number(item.totalteststaken),
        }));
        setLeaderboard(formattedLeaderboard);
      })
      .catch((e) => {
        console.error("TestSection: Failed to load leaderboard", e); // Log 9
      });
  }, []);

  const handleNavigateToTests = () => {
    navigate("/tests");
  };

  // Function to get the displayed leaderboard entries
  const getDisplayedLeaderboard = () => {
    if (!user) {
      return leaderboard.slice(0, 10);
    }

    const currentUserIndex = leaderboard.findIndex(
      (entry) => entry.userid === user.id
    );

    if (currentUserIndex === -1) {
      return leaderboard.slice(0, 10);
    }

    if (currentUserIndex < 10) {
      return leaderboard.slice(0, 10);
    }

    const startIndex = Math.max(0, currentUserIndex - 2);
    const endIndex = Math.min(leaderboard.length, currentUserIndex + 3);
    const currentUserAndNeighbors = leaderboard.slice(startIndex, endIndex);

    return [...leaderboard.slice(0, 10), ...currentUserAndNeighbors];
  };

  const displayedLeaderboard = getDisplayedLeaderboard();

  return (
    <Section>
      <h2>Тесты и рейтинг учеников:</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TestList>
          {tests.map((test) => (
            <TestCard key={test.id} test={test} role={role} userId={userId} />
          ))}
        </TestList>
      )}
      {role === "teacher" && (
        <ActionButton
          variant="orange"
          textButton="Перейти к тестам"
          onClick={handleNavigateToTests}
        />
      )}
      {role === "moderator" && (
        <ActionButton
          variant="orange"
          textButton="Перейти к тестам"
          onClick={handleNavigateToTests}
        />
      )}

      {/* New leaderboard section */}
      <LeaderboardSection>
        <h3>Рейтинг учеников</h3>
        <LeaderboardList>
          {displayedLeaderboard.map((entry, index) => {
            const isCurrentUser = user?.id === entry.userid;
            const isNearCurrentUser =
              isCurrentUser ||
              (leaderboard.findIndex(
                (item) => item.userid === user?.id
              ) !== -1 &&
                Math.abs(
                  index -
                    leaderboard.findIndex((item) => item.userid === user?.id)
                ) <= 2);
            const isEllipsis =
              index === 10 &&
              leaderboard.findIndex((item) => item.userid === user?.id) > 10;
            const showItem = isNearCurrentUser || index < 10;

            if (isEllipsis) {
              return <EllipsisItem key="ellipsis">...</EllipsisItem>;
            }
            if (showItem) {
              return (
                <LeaderboardItem
                  key={entry.userid}
                  isCurrentUser={isCurrentUser}
                >
                  {leaderboard.findIndex((item) => item === entry) + 1}.{" "}
                  {entry.name} - Средний балл: {entry.averagescore.toFixed(2)}{" "}
                  - Всего тестов: {entry.totalteststaken}
                </LeaderboardItem>
              );
            }
            return null;
          })}
        </LeaderboardList>
      </LeaderboardSection>
    </Section>
  );
};

export default TestSection;
