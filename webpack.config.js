import { path } from 'path';

export const entry = './src/server.ts';
export const output = {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'), // Output directory
};