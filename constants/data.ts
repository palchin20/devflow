export const questions = [
  {
    _id: '1',
    title: 'How to learn React?',
    description: "I want to learn React, but I don't know where to start.",
    tags: [
      { _id: '1', name: 'React' },
      { _id: '2', name: 'JavaScript' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
    createdAt: '2023-10-01T12:00:00Z',
    upvotes: 10,
    answers: 2,
    views: 100,
  },
  {
    _id: '2',
    title: 'How to learn Next.js?',
    description: "I want to learn Next.js, but I don't know where to start.",
    tags: [
      { _id: '1', name: 'Next.js' },
      { _id: '2', name: 'React' },
    ],
    author: {
      _id: '2',
      name: 'Jane Smith',
      avatar: 'https://example.com/avatar.jpg',
    },
    createdAt: '2023-10-02T12:00:00Z',
    upvotes: 5,
    answers: 1,
    views: 50,
  },
  {
    _id: '3',
    title: 'How to learn JavaScript?',
    description: "I want to learn JavaScript, but I don't know where to start.",
    tags: [
      { _id: '1', name: 'JavaScript' },
      { _id: '2', name: 'Programming' },
    ],
    author: {
      _id: '3',
      name: 'Alice Johnson',
      avatar: 'https://example.com/avatar.jpg',
    },
    createdAt: '2023-10-03T12:00:00Z',
    upvotes: 8,
    answers: 3,
    views: 75,
  },
];

export const hotQuestions = [
  { _id: 1, question: 'What is the best way to learn React?' },
  { _id: 2, question: 'How to optimize performance in React applications?' },
  { _id: 3, question: 'What are the differences between React and Vue?' },
  { _id: 4, question: 'How to manage state in React?' },
  { _id: 5, question: 'What is the purpose of useEffect in React?' },
  { _id: 6, question: 'How to handle forms in React?' },
];

export const popularTags = [
  {
    _id: 1,
    name: 'react',
    questions: 100,
  },
  {
    _id: 2,
    name: 'typescript',
    questions: 400,
  },
  {
    _id: 3,
    name: 'javascript',
    questions: 1200,
  },
  {
    _id: 4,
    name: 'next-js',
    questions: 64,
  },
  {
    _id: 5,
    name: 'redux',
    questions: 20,
  },
  {
    _id: 6,
    name: 'generic',
    questions: 345,
  },
  {
    _id: 7,
    name: 'csharp',
    questions: 345,
  },
  {
    _id: 8,
    name: 'c++',
    questions: 345,
  },
  {
    _id: 9,
    name: 'dotnet',
    questions: 345,
  },
  {
    _id: 10,
    name: 'html',
    questions: 345,
  },
];
