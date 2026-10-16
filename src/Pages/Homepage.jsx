import React, { useEffect, useMemo, useState } from 'react';
import { getAllMemes } from '../API/memes';
import Card from './Card';

const Homepage = () => {
    const [memes, setMemes] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        getAllMemes(controller.signal)
            .then(setMemes)
            .catch((loadError) => {
                if (loadError.name !== 'AbortError') {
                    setError(loadError.message || 'Could not load memes. Please try again.');
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, []);

    const filteredMemes = useMemo(() => {
        const query = search.trim().toLowerCase();
        return query
            ? memes.filter((meme) => (meme.name || '').toLowerCase().includes(query))
            : memes;
    }, [memes, search]);

    return (
        <main className="home-page">
            <section className="hero">
                <p className="eyebrow">YOUR NEXT BIG LAUGH</p>
                <h2>Make a meme. Make someone’s day.</h2>
                <p>Choose a template, add your words, and share the laugh.</p>
                <label className="search-box">
                    <span className="visually-hidden">Search meme templates</span>
                    <input
                        type="search"
                        placeholder="Search meme templates..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </label>
            </section>

            <section className="gallery-section" aria-labelledby="gallery-title">
                <div className="section-heading">
                    <div>
                        <h2 id="gallery-title">Meme templates</h2>
                        <p>Pick a template to start creating</p>
                    </div>
                    {!loading && !error && (
                        <span className="result-count">
                            {filteredMemes.length} {filteredMemes.length === 1 ? 'template' : 'templates'}
                        </span>
                    )}
                </div>

                {loading && <p className="notice">Loading meme templates...</p>}
                {error && (
                    <div className="notice error" role="alert">
                        {error}
                        <button className="text-button" type="button" onClick={() => window.location.reload()}>
                            Try again
                        </button>
                    </div>
                )}
                {!loading && !error && filteredMemes.length === 0 && (
                    <p className="notice">No templates match “{search}”. Try another search.</p>
                )}
                {!loading && !error && filteredMemes.length > 0 && (
                    <div className="meme-grid">
                        {filteredMemes.map((meme) => (
                            <Card key={meme.id} img={meme.url} title={meme.name} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Homepage;
