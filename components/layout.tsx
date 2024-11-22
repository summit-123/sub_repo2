import { ComponentChildren } from "preact";

interface LayoutProps {
  children: ComponentChildren;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div class="min-h-screen bg-gray-100">
      <header class="bg-primary text-white p-4">
        <h1 class="text-2xl font-bold">Lazycard</h1>
      </header>
      <main class="container mx-auto p-4">
        {children}
      </main>
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2023 Lazycard</p>
      </footer>
    </div>
  );
}
