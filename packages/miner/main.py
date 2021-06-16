import click
from urllib.parse import urljoin
import requests
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

    while True:
        try:
            # Get block data to mine
            response = requests.get(req_url)
            block = response.json()

            click.echo(block)
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
