import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import { questions } from '@/constants/data';
import Link from 'next/link';
import HomeFilter from '@/components/filters/HomeFilter';
import QuestionCard from '@/components/cards/QuestionCard';

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = '', filter = '' } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());

    const matchesFilter = filter
      ? question.tags.find(
          (tag) => tag.name.toLowerCase() === filter.toLowerCase()
        )
      : true;

    return matchesQuery && matchesFilter;
  });

  console.log(filteredQuestions);

  return (
    <>
      <section className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100-light900'>All Questions</h1>
        <Button
          asChild
          className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className='mt-11'>
        <LocalSearch
          route='/'
          imgSrc='/icons/search.svg'
          placeholder='Search questions...'
          otherClasses='flex-1'
        />
      </section>
      <HomeFilter />
      <div className='mt-10 flex w-full flex-col gap-6'>
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
