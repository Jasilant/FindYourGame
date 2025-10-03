'use client';

import Link from 'next/link';
import React, { useState } from 'react';

interface NavDropdownProps {
  label: string;
  items: { name: string; href: string }[];
}

export default function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="rounded-lg px-3 py-1.5 hover:bg-white/5">
        {label}
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-black/90 shadow-lg backdrop-blur-md">
          <ul className="p-2 text-sm">
            {items.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2 hover:bg-orange-500/20 hover:text-orange-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
