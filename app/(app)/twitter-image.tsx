import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "SEO Docs - Master the Art of Search Engine Optimization";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					fontFamily: "system-ui, sans-serif",
					padding: "40px",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "center",
						width: "60%",
					}}
				>
					<h1
						style={{
							fontSize: 64,
							fontWeight: "bold",
							color: "black",
							margin: 0,
							lineHeight: 1.1,
							marginBottom: "20px",
						}}
					>
						Master the Art of Search Engine Optimization
					</h1>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginTop: "20px",
						}}
					>
						<div
							style={{
								width: "50px",
								height: "50px",
								borderRadius: "25px",
								marginRight: "15px",
								background: "#ccc",
							}}
						/>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<p
								style={{
									fontSize: "24px",
									fontWeight: "bold",
									margin: 0,
								}}
							>
								SEO Docs
							</p>
							<p
								style={{
									fontSize: "18px",
									color: "#666",
									margin: 0,
								}}
							>
								@seo-docs
							</p>
						</div>
					</div>
				</div>
				<div
					style={{
						width: "40%",
						height: "100%",
						background: "#f0f0f0",
					}}
				/>
			</div>
		),
		{
			...size,
		}
	);
}
