import Sidebar from "./components/Sidebar";
import Field from "./components/Field";
import FormationSelector from "./components/FormationSelector";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <Field />
      </div>

      {/* Right Panel */}
      <div className="w-60 bg-[#140B20] p-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
          <p className="mt-2">Username</p>
        </div>
        <FormationSelector />
      </div>
    </div>
  );
}

export default App;
