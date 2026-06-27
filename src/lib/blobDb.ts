import fs from 'fs';
import path from 'path';
import { put, list } from '@vercel/blob';

// Local paths
const LOCAL_PORTFOLIO_PATH = path.join(process.cwd(), 'data', 'portfolio.json');
const LOCAL_ARTICLES_PATH = path.join(process.cwd(), 'data', 'articles.json');

export const hasBlobToken = () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  return !!token && token !== 'vercel_blob_rw_your_token_here' && token !== '';
};

// Helper to read local files
const readLocalJSON = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading local file ${filePath}:`, err);
  }
  return null;
};

// Helper to write local files
const writeLocalJSON = (filePath: string, data: any) => {
  try {
    // Ensure data directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing local file ${filePath}:`, err);
    return false;
  }
};

export async function getPortfolioData() {
  const localData = readLocalJSON(LOCAL_PORTFOLIO_PATH) || {};
  
  if (hasBlobToken()) {
    try {
      const { blobs } = await list();
      const portfolioBlob = blobs.find(b => b.pathname === 'portfolio.json');
      
      if (portfolioBlob) {
        // Fetch current blob data
        const res = await fetch(portfolioBlob.url, { cache: 'no-store' });
        if (res.ok) {
          return await res.json();
        }
      }
      
      // If not in blob store, initialize it with local seed data
      console.log('Initializing portfolio.json in Vercel Blob Store...');
      await put('portfolio.json', JSON.stringify(localData, null, 2), {
        access: 'public',
        addRandomSuffix: false,
      });
      return localData;
    } catch (err) {
      console.error('Failed to read from Vercel Blob, falling back to local file:', err);
      return localData;
    }
  }
  
  return localData;
}

export async function savePortfolioData(data: any) {
  if (hasBlobToken()) {
    try {
      console.log('Saving portfolio.json to Vercel Blob Store...');
      const blob = await put('portfolio.json', JSON.stringify(data, null, 2), {
        access: 'public',
        addRandomSuffix: false,
      });
      return blob.url;
    } catch (err) {
      console.error('Failed to save to Vercel Blob:', err);
      throw err;
    }
  } else {
    const success = writeLocalJSON(LOCAL_PORTFOLIO_PATH, data);
    if (!success) throw new Error('Failed to write portfolio data locally');
    return 'local';
  }
}

export async function getArticles() {
  const localData = readLocalJSON(LOCAL_ARTICLES_PATH) || [];
  
  if (hasBlobToken()) {
    try {
      const { blobs } = await list();
      const articlesBlob = blobs.find(b => b.pathname === 'articles.json');
      
      if (articlesBlob) {
        const res = await fetch(articlesBlob.url, { cache: 'no-store' });
        if (res.ok) {
          return await res.json();
        }
      }
      
      // Initialize with seed data
      console.log('Initializing articles.json in Vercel Blob Store...');
      await put('articles.json', JSON.stringify(localData, null, 2), {
        access: 'public',
        addRandomSuffix: false,
      });
      return localData;
    } catch (err) {
      console.error('Failed to read articles from Vercel Blob, falling back to local:', err);
      return localData;
    }
  }
  
  return localData;
}

export async function saveArticles(data: any[]) {
  if (hasBlobToken()) {
    try {
      console.log('Saving articles.json to Vercel Blob Store...');
      const blob = await put('articles.json', JSON.stringify(data, null, 2), {
        access: 'public',
        addRandomSuffix: false,
      });
      return blob.url;
    } catch (err) {
      console.error('Failed to save articles to Vercel Blob:', err);
      throw err;
    }
  } else {
    const success = writeLocalJSON(LOCAL_ARTICLES_PATH, data);
    if (!success) throw new Error('Failed to write articles data locally');
    return 'local';
  }
}
