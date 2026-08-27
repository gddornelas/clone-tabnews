const { exec } = require("node:child_process");

function checkpostgres() {
    exec("docker exec postgres-dev pg_isready", handleReturn);

    function handleReturn(error, stdout, stderr) {
        if (stdout.search("accepting connections") === -1) {
            process.stdout.write(".");
            checkpostgres();
            return;
        }

        console.log("\n🟢 Postgres está pronto e aceitando conexões!")
    }
}

process.stdout.write("\n\n🔴 Aguardando o postgres aceitar conexões");
checkpostgres();