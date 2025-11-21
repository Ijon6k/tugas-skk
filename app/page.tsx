import EncryptionForm from "@/components/EncryptionForm";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-700">
        🔐 Encryption Generator
      </h1>
      <EncryptionForm />
      <p className="mt-6 text-sm text-gray-500">
        Made with ❤️ using Next.js + TypeScript
      </p>
    </main>
  );
}
