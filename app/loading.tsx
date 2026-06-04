"use client";
import "./styles/loading.css"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="progress">
        <div className="progress-value"></div>
      </div>
    </div>
  );
}
