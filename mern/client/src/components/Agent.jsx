import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Agent() {
  const [form, setForm] = useState({
    name: "",
    rating: "",
    fee: "",
    region: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/agent/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const agent = await response.json();
      if (!agent) {
        console.warn(`Agent with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(agent);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new agent we will POST to /agent.
        response = await fetch("http://localhost:5050/agent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a agent we will PATCH to /agent/:id.
        response = await fetch(`http://localhost:5050/agent/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred adding or updating a agent: ", error);
    } finally {
      setForm({ name: "", rating: "", fee: "", region: "" });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">
        Create/Update Employee Agent
      </h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Employee Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Rating
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="rating"
                    id="rating"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Rating"
                    value={form.rating}
                    onChange={(e) => updateForm({ rating: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="fee"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Fee
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="fee"
                    id="fee"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Fee "
                    value={form.fee}
                    onChange={(e) => updateForm({ fee: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Region Options</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="regionNorth"
                      name="regionOptions"
                      type="radio"
                      value="North"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.region === "North"}
                      onChange={(e) => updateForm({ region: e.target.value })}
                    />
                    <label
                      htmlFor="regionNorth"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      North
                    </label>
                    <input
                      id="regionSouth"
                      name="regionOptions"
                      type="radio"
                      value="South"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.region === "South"}
                      onChange={(e) => updateForm({ region: e.target.value })}
                    />
                    <label
                      htmlFor="regionSouth"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      South
                    </label>
                    <input
                      id="regionEast"
                      name="regionOptions"
                      type="radio"
                      value="East"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.region === "East"}
                      onChange={(e) => updateForm({ region: e.target.value })}
                    />
                    <label
                      htmlFor="regionEast"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      East
                    </label>
                    <input
                      id="regionWest"
                      name="regionOptions"
                      type="radio"
                      value="West"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.region === "West"}
                      onChange={(e) => updateForm({ region: e.target.value })}
                    />
                    <label
                      htmlFor="regionWest"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      West
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Employee Agent"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
