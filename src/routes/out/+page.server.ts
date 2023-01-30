import type { RequestHandler } from '@sveltejs/kit'

export async function get({ params }) {
    const file = `./${params.file}.csv`;
    const csvs = import.meta.glob('./*.csv', { as: 'raw' });
    const csv = csvs[file];

    return {
        status: 200,
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": "attachment; filename=" + params.file + ".csv"
        },
        body: csv
    }
}

// newSave();



