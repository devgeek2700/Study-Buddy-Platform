import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { studyGroups } from "./Data";
import "./tests.css";

// Import GoogleGenerativeAI library and necessary constants
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// Define your API key and model name
const API_KEY = "AIzaSyDb8BHYwjuA0B6oalqrwwluPuPvOVhJQeA";
const MODEL_NAME = "gemini-1.0-pro";

function Tests() {
  const { id } = useParams();
  const group = studyGroups.find(
    (group) => group.StudyGroupId === parseInt(id)
  );
  const [questions, setQuestions] = useState([]);


const generateQuestions = async (topic) => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Safety settings to avoid harmful content
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  try {
    // Send the topic name as user input to generate questions
    const result = await chat.sendMessage(`Generate 10 multiple-choice questions (MCQs) suitable for 12th standard students on topics related to ${topic}. Each question should offer four options, with the correct answer among them. Ensure the difficulty level is appropriate for students. Also, assign 2 marks to each question for a total of 20 marks. Additionally, provide the correct answer for each question from the given options provide the answer from the options not the option. Generate the resulting response in JSON format. Name the JSON response with the chapter name, and ensure that the JSON structure resembles the provided example. Do not include the actual questions in the prompt, but ensure that each response includes the question, options, correct answer, and weight. Ensure there are exactly 10 questions, not less than that, strictly 10 questions, in the JSON response. Additionally, title the exam "${topic} Exam".`);

    // Log the response from the API
    console.log("Response from API:", result.response.text());

    // Parse the response text
    const jsonResponse = JSON.parse(result.response.text());

    // Check if the response contains valid JSON data
    if (typeof jsonResponse === 'object' && jsonResponse !== null) {
      // Group the questions by topic
      const formattedQuestions = [
        {
          [`${topic} Exam`]: jsonResponse.map((question) => ({
            "Question": question.question,
            "Options": question.options,
            "Correct Answer": question.correct_answer,
            "Weight": 2
          }))
        }
      ];

      // Log the formatted questions in the console
      console.log(`Generated Questions for ${topic} Exam:`, formattedQuestions);

      // Update state with the generated questions
      setQuestions((prevQuestions) => [...prevQuestions, formattedQuestions]);
    } else {
      console.error("Invalid or empty JSON response:", jsonResponse);
    }
  } catch (error) {
    console.error("Error generating questions:", error);
  }
};


  // useEffect hook to generate questions for each topic when component mounts
  useEffect(() => {
    group.Topics.forEach((topic) => {
      generateQuestions(topic);
    });
  }, [group]);

  return (
    <div className="test-page">
      <div className="test-header">
        <h1>{group.Subject} Test</h1>
        <h2>{group.GroupName} Group</h2>
      </div>
      <div className="topics-list">
        <h2>Topics</h2>
        <div>
          <ul>
            {group.Topics.map((topic, index) => (
              <li key={index}>
                <span className="bullet">•</span> {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="generated-questions">
        <h2>Generated Questions</h2>
        {Object.entries(questions).map(([topic, topicQuestions], index) => (
          <div key={index}>
            <h3>{topic}</h3>
            <ul>
              {topicQuestions.map((question, idx) => (
                <li key={idx}>
                  <div>
                    <p>{question.Question}</p>
                    <ul>
                      {question.Options.map((option, optionIdx) => (
                        <li key={optionIdx}>{option}</li>
                      ))}
                    </ul>
                    <p>Correct Answer: {question["Correct Answer"]}</p>
                    <p>Weight: {question.Weight}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tests;
