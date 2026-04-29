"use client";

import React, { useState } from "react";

export default function DeleteConfirm({
  id,
  title = "Delete",
  message = "Are you sure?",
  onConfirm
}) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm?.();
    } finally {
      setLoading(false);
      document.getElementById(id)?.close();
    }
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-sm">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4 text-base-content/70 text-sm">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn-btn-ghost btn-sm">Cancel</button>
          </form>
          <button
            className="btn btn-error btn-sm"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner loading-xs" />}
            Delete
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
