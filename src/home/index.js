import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="py-24 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 items-center gap-8">
            <div>
              <h1 className="text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                Manage your tasks using panelist Manager
              </h1>
              <p className="mt-6 text-lg tracking-tight text-slate-700">
                Trusted by 30 million people and teams. Panelist Manager is the
                world's favorite task manager and to-do list app. Finally become
                focused.
              </p>
              <div className="mt-8">
                <Link to="/todo">
                  <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-4 px-8 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Todo Manager
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid place-content-center">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/to-do-list-4268216-3569378.png"
                className="h-[28rem] w-full object-scale-down"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
