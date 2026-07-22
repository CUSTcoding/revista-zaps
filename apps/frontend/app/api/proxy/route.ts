export async function GET() {
    try {
        const res = await fetch("https://blockchain.info/latestblock?cors=true",
            {next: { revalidate: 5000 }}
        );

        if (!res.ok) {
            return Response.json(
                { error: "Erro ao buscar dados da blockchain" },
                { status: res.status }
            );
        }

        const data = await res.json();

        return Response.json(data);

    } catch (error) {
        return Response.json(
            { error: "Falha no servidor" },
            { status: 500 }
        );
    }
}
