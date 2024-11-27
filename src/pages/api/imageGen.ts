export async function imageQuery(data: { inputs: string }) {
  const HUGGINGFACE_TOKEN = import.meta.env.PUBLIC_HUGGINGFACE_TOKEN;

	const response = await fetch(
		"https://api-inference.huggingface.co/models/Artples/LAI-ImageGeneration-vSDXL-2",
		{
			headers: {
				Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}