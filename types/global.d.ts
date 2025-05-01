interface Question {
  _id: string;
  title: string;
  description: string;
  author: Author;
  createdAt: Date;
  tags: Tag[];
  upvotes: number;
  answers: number;
  views: number;
}

interface Author {
  _id: string;
  name: string;
  avatar: string;
}

interface Tag {
  _id: string;
  name: string;
}
