import React from "react";

interface HomeProps {
  user: { username: string } | null;
}

export default function Home({ user }: HomeProps) {
  return (
    <div>
      <h2>Hello</h2>
      {user && <p>Welcome {user.username}!</p>}
    </div>
  );
}
