export default function Header() {
    return (
        <header className="h-[70] grid grid-cols-3 w-full justify-center items-center">
            <div>logo</div>
            <nav className="flex gap-2 justify-center items-center">
                <a>Home</a>
                <a>About</a>
                <a>Contact</a>
            </nav>
            <div className="flex justify-end p-2 gap-2">
                <button>Login</button>
                <button>Get Started</button>
            </div>
        </header>
    )
}