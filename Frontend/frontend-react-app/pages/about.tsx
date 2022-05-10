import Link from 'next/link';
import Layout from '../components/Layout';

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <div>This is the about page</div>
    <div>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </div>
  </Layout>
);

export default AboutPage;
