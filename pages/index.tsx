import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetch('http://localhost:3000/api/list');

  // const result = await fetch(
  //   'http://localhost:3000/api/markdown?markdown=post1'
  // );
  const data = await result.json();
  const posts = await Promise.all(
    data.map(async (el: string) => {
      const result = await fetch(
        `http://localhost:3000/api/markdown?markdown=${el}`
      );
      const content = await result.json();
      return {
        ...content,
        filePath: el,
      };
    })
  );
  return {
    props: {
      data: posts,
    },
  };
};

type StaticProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home(props: StaticProps) {
  const { data } = props;

  return (
    <>
      <h1>원티드 챌린지 7월 Next.js 마크다운 블로그 만들기</h1>
      <section>
        <ul>
          {data.map((el: any) => (
            <li key={el.filePath}>
              <Link href={`/${el.filePath}`}>{el.parsed.data.title}</Link>
            </li>
          ))}
        </ul>
        {/* <div dangerouslySetInnerHTML={{ __html: data.value }} /> */}
      </section>
    </>
  );
}
