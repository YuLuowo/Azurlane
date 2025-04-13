'use client'

import { useEffect, useState } from 'react';

type Ship = {
    name: string;
    painting: string;
};

type Result = {
    painting: string;
    status: {
        painting: boolean;
        shipmodels: boolean;
        qicon: boolean;
        shipyardicon: boolean;
    };
};

export default function TestPage() {
    const [results, setResults] = useState<Result[]>([]);

    useEffect(() => {
        const fetchShips = async () => {
            try {
                const res = await fetch(`/api/ship`);
                const ships: Ship[] = await res.json();

                const checkImageExists = async (url: string) => {
                    try {
                        const response = await fetch(url, { method: 'HEAD' });
                        return response.ok;
                    } catch (error) {
                        return false;
                    }
                };

                const cdnBaseUrls = {
                    painting: 'https://cdn.imagineyuluo.com/AzurLane/TW/painting/',
                    shipmodels: 'https://cdn.imagineyuluo.com/AzurLane/TW/shipmodels/',
                    qicon: 'https://cdn.imagineyuluo.com/AzurLane/TW/qicon/',
                    shipyardicon: 'https://cdn.imagineyuluo.com/AzurLane/TW/shipyardicon/',
                };

                const results = await Promise.all(
                    ships.map(async (ship) => {
                        const { painting } = ship;
                        const status = {
                            painting: await checkImageExists(`${cdnBaseUrls.painting}${painting.toLowerCase()}.png`),
                            shipmodels: await checkImageExists(`${cdnBaseUrls.shipmodels}${painting}.png`),
                            qicon: await checkImageExists(`${cdnBaseUrls.qicon}${painting}.png`),
                            shipyardicon: await checkImageExists(`${cdnBaseUrls.shipyardicon}${painting}.png`),
                        };
                        return { painting, status };
                    })
                );

                setResults(results.filter(r => Object.values(r.status).includes(false))); // 只顯示有缺失的
            } catch (error) {
                console.error('Failed to fetch ship data', error);
            }
        };

        fetchShips();
    }, []);

    return (
        <div>
            <h1>圖片檢查結果</h1>
            {results.length === 0 ? (
                <p>全部圖片都存在或尚未載入完畢...</p>
            ) : (
                <ul>
                    {results.map((result) => (
                        <li key={result.painting}>
                            <strong>{result.painting}</strong>：
                            {Object.entries(result.status).map(([key, exists]) =>
                                    !exists ? (
                                        <span key={key} style={{ color: 'red' }}>
                    {' '}
                                            {key}: 沒有;
                  </span>
                                    ) : null
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
