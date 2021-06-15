import click
from urllib.parse import urljoin
import requests


@click.command()
@click.option("--server", default="http://127.0.0.1", help="Server URL")
@click.option(
    "--max-nonce", default=2 ** 32 - 1, help="The maximum nonce to try when mining."
)
def main(server, max_nonce):
    click.echo("Starting LASSCoin Miner. Use --help to see all CLI options.")

    req_url = urljoin(server, "/api/miner/")


if __name__ == "__main__":
    main()
