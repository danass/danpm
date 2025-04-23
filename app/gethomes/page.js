'use client';
import { useState } from 'react';

export default function GetHomes() {
    const [homeId, setHomeId] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPhotos([]);

        try {
            const response = await fetch(`/api/fetchHome?homeId=${homeId}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch home data');
            }

            if (data.photos && data.photos.length > 0) {
                setPhotos(data.photos);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const downloadPhoto = async (url, filename) => {
        try {
            const photoUrl = `${url}?quality=100&height=1080`;
            const response = await fetch(`/api/downloadPhoto?url=${encodeURIComponent(photoUrl)}&filename=${encodeURIComponent(filename)}`);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error('Failed to download photo:', err);
        }
    };

    const downloadAllPhotos = async () => {
        try {
            setDownloading(true);
            const response = await fetch('/api/downloadAllPhotos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    photos,
                    homeId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to download photos');
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `home-${homeId}-photos.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error('Failed to download photos:', err);
            setError('Failed to download photos. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900">HomeExchange Photo Downloader</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="homeId" className="block text-sm font-medium text-gray-700">
                                Home ID
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="homeId"
                                    value={homeId}
                                    onChange={(e) => setHomeId(e.target.value)}
                                    placeholder="Enter home ID (e.g., 2094462)"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {loading ? 'Loading...' : 'Fetch Photos'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {photos.length > 0 && (
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Available Photos ({photos.length})</h2>
                                <button
                                    onClick={downloadAllPhotos}
                                    disabled={downloading}
                                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                        downloading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                                >
                                    {downloading ? 'Downloading...' : 'Download All Photos (ZIP)'}
                                </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {photos.map((photo, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={`${photo.url}?quality=100&height=1080`}
                                            alt={`Home photo ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => downloadPhoto(photo.url, `home-${homeId}-photo-${index + 1}.jpg`)}
                                            className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center"
                                        >
                                            Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
