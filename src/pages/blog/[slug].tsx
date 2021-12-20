import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React, { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import {
  Header,
  MetadataHead,
  OpenGraphHead,
  ShareWidget,
  StructuredDataHead,
} from '@/views/SingleArticlePage';
import { formatDate, getAllPostsSlugs, getReadTime, getSinglePost } from '@/utils';
import { Container } from '@/layout';
import { MDXRichText } from '@/components';
import { media } from '@/utils/media';

export default function SingleArticlePage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { slug, content, meta, readTime } = props;
  const { title, date, imageUrl } = meta;

  const formattedDate = formatDate(new Date(date));

  useEffect(() => {
    lazyLoadPrismTheme();

    function lazyLoadPrismTheme() {
      const prismThemeLinkEl = document.querySelector('link[data-id="prism-theme"]');

      if (!prismThemeLinkEl) {
        const headEl = document.querySelector('head');
        if (headEl) {
          const newEl = document.createElement('link');
          newEl.setAttribute('data-id', 'prism-theme');
          newEl.setAttribute('rel', 'stylesheet');
          newEl.setAttribute('href', '/prism-theme.css');
          newEl.setAttribute('media', 'print');
          newEl.setAttribute('onload', "this.media='all'; this.onload=null;");
          headEl.appendChild(newEl);
        }
      }
    }
  }, []);

  return (
    <>
      <Head>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-css-tags */}
          <link rel="stylesheet" href="/prism-theme.css" />
        </noscript>
      </Head>
      <OpenGraphHead slug={slug} {...meta} />
      <StructuredDataHead slug={slug} {...meta} />
      <MetadataHead {...meta} />
      <CustomContainer id="content">
        <ShareWidget title={title} slug={slug} />
        <Header
          title={title}
          formattedDate={formattedDate}
          imageUrl={imageUrl}
          readTime={readTime}
        />
        <MDXRichText {...content} />
      </CustomContainer>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPostsSlugs();
  return {
    paths: posts.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  if (params) {
    const { slug, content, meta } = await getSinglePost(params.slug);
    const serializedContent = await serializeContent(content, meta);
    return {
      props: {
        slug,
        content: serializedContent,
        meta,
        readTime: getReadTime(content),
      },
    };
  }

  async function serializeContent(content: string, meta: Record<string, unknown>) {
    const { serialize } = await import('next-mdx-remote/serialize');
    return serialize(content, {
      scope: meta,
      mdxOptions: {
        remarkPlugins: [
          // @ts-ignore
          await import('@fec/remark-a11y-emoji'),
          await import('remark-breaks'),
          await import('remark-gfm'),
          await import('remark-footnotes'),
          await import('remark-external-links'),
          await import('remark-slug'),
          // @ts-ignore
          await import('remark-sectionize'),
        ],
        rehypePlugins: [],
      },
    });
  }
}

const CustomContainer = styled(Container)`
  position: relative;
  max-width: 90rem;
  margin: 10rem auto;

  ${media('<=tablet')} {
    margin: 5rem auto;
  }
`;
