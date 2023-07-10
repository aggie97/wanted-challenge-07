import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export async function getStaticPaths() {
  const result = await fetch('http://localhost:3000/api/list');
  const list = await result.json();
  return {
    paths: list.map((path: string) => {
      return {
        params: { id: path },
      };
    }),
    fallback: false,
  };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const result = await fetch(
    `http://localhost:3000/api/markdown?markdown=${params?.id}`
  );
  const content = await result.json();

  return { props: { data: content } };
};

const DetailPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    data: { markdown, parsed },
  } = props;
  const {
    data: { date, description, slug, tags, title, categories },
  } = parsed;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="Date" content={date} />
        <meta name="keyword" content={slug} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="nextjsblog" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={imgURL} />
        <meta property="og:url" content={deployURL} /> */}

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="nextjsblog" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        {/* <meta property="twitter:image" content={imgURL} />
        <meta property="twitter:url" content={deployURL} /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
    </>
  );
};

export default DetailPage;
