

export async function getRepositoryContent() {
  const res = await fetch(
    "https://api.github.com/repos/masamichi2004/programming-enshu2/contents/README.md",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_ACCESS_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  const content = atob(data.content);

  const uint8Array = new Uint8Array(content.length);
  for (let i = 0; i < content.length; i++) {
    uint8Array[i] = content.charCodeAt(i);
  }

  // UTF-8デコード
  const decoder = new TextDecoder("utf-8");
  const decodedContent = decoder.decode(uint8Array);
  return decodedContent;


}