import Navbar from "../components/Navbar";

const Leads = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Leads</h1>
        <p>Here you can manage and filter all leads across customers.</p>
        {/* TODO: Add filters, charts, global leads list */}
      </div>
    </div>
  );
};

export default Leads;
