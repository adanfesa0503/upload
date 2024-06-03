import Image from 'next/image';
import { join } from 'path';
import styles from '.././page.module.css';
import { writeFile } from 'fs/promises';

export default function ServerUploadPage() {
    async function upload(data: FormData) {
        'use server';
        console.error(data)
        const file: File | null = data.get('file') as unknown as File;
        if (!file) {
            throw new Error('No file uploaded');
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join('./public', 'files', file.name);
        await writeFile(path, buffer);
        console.log(`open ${path} to see the uploaded file`);

        return { success: true };
    }

    return (
        <main className={styles.main}>
            <h1>React Server Component: Upload</h1>
            <form action={upload}>
                <input type="file" name="file" />
                <input type="submit" value="Upload" />
            </form>
            <Image width={50} height={50} src={`/files/address-card.svg`} alt='file' />
        </main>
    );
}