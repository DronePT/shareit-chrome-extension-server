import createMetascraper from 'metascraper';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';
import metascraperDescription from 'metascraper-description';
import got from 'got';

const metascraper = createMetascraper([
  metascraperImage(),
  metascraperTitle(),
  metascraperUrl(),
  metascraperDescription(),
]);

export interface UrlMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const getMetadata = async (urlToScrap: string): Promise<UrlMetadata> => {
  const { body: html, url } = await got(urlToScrap);

  const metadata = await metascraper({ html, url });

  return metadata;
};
