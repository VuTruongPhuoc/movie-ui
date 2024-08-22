function Home({ children }) {
    return (
        <div>
            <h1>Home Page</h1>
            <div>
                {/* Vị trí chèn các thành phần con */}
                {children}
            </div>
        </div>
    );
}

export default Home;
