
const Home = () => {

    const handleSignIn = () => {
        window.location.href = "https://localhost:5289/api/auth/login?returnUrl=https://localhost:5173/dashboard";

    }
    return (
        <>
            <h1>Home</h1>
            <button onClick={handleSignIn}>Login</button>
        </>
    )
}

export default Home;