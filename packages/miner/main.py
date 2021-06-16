import click
from urllib.parse import urljoin
import requests
import json
import sys
import time
from hashlib import sha256


@click.command()
@click.option("--server", default="http://127.0.0.1:8000", help="Server URL")
@click.option(
    "--max-nonce", default=2 ** 32 - 1, help="Maximum nonce to try when mining"
)
@click.option("--address", help="Miner's public address.", required=True)
def main(server, max_nonce, address):
    click.echo("Starting LASSCoin Miner. Use --help to see all CLI options.")

    req_url = urljoin(server, "/api/miner/")
    difficulty_url = urljoin(req_url, "/api/miner/difficulty")

    try:
        difficulty = requests.get(difficulty_url).json()
    except Exception:
        click.echo(
            "Connection Failed. Check your internet connection and/or server location."
        )
        sys.exit()
    finally:
        click.echo(f"Difficulty set to level {difficulty}")

    while True:
        try:
            # Get block data to mine
            click.echo("Requesting new block...")
            response = requests.get(req_url)
            block = response.json()

            # If no blocks are available
            if "message" in block:
                click.echo("No blocks to mine. Sleeping 2 mins.")
                time.sleep(120)
                continue

            block["miner"] = address

            for i in range(max_nonce):
                if i % 100000 == 0:
                    click.echo("Mining...")
                block["nonce"] = i
                h = sha256()
                h.update(json.dumps(block).encode("utf-8"))
                hash = h.hexdigest()
                if hash.startswith("0" * difficulty):
                    click.echo(
                        f"Block {block['height']} mined with nonce {block['nonce']}"
                    )
                    break

            time.sleep(1)

        except KeyboardInterrupt:
            # Get rid of the ctrl c when exiting
            click.echo("\rExiting...")
            sys.exit(0)
        except Exception as e:
            click.echo("An exception has occured. Trying again in 1 min.")
            click.echo(e)
            time.sleep(60)


if __name__ == "__main__":
    main()
