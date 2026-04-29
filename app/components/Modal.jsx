"use client";

export default function Modal({ id, title, children, size = "max-w-lg" }) {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className={`modal-box ${size} p-0 overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-300">
          <h3 className="font-bold text-lg">{title}</h3>
          <form method="dialog">
            <button className="btn btn-ghost btn-sm btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
        </div>
        {/* Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export function openModal(id) {
  document.getElementById(id)?.showModal();
}

export function closeModal(id) {
  document.getElementById(id)?.close();
}
