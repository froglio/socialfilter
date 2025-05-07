import os
import json
import sys
import asyncio
from twscrape import API, gather
from dotenv import load_dotenv

current_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(current_dir, ".env")
load_dotenv(dotenv_path=dotenv_path)

async def scrape_twitter_posts(query: str, limit: int = 50):
  api = API()
  
  CT0 = os.getenv("COOKIES_CT0")
  AUTH_TOKEN = os.getenv("COOKIES_AUTH_TOKEN")
  GUEST_ID = os.getenv("COOKIES_GUEST_ID")
  cookies = f"ct0={CT0}; auth_token={AUTH_TOKEN}; guest_id={GUEST_ID};"

  await api.pool.add_account(
    os.getenv("USERNAME"),
    os.getenv("PASSWORD"),
    os.getenv("EMAIL"),
    os.getenv("EMAIL_PASSWORD"),
    cookies=cookies,
  )

  await api.pool.login_all()

  # Realiza a busca com limite definido
  tweets = await gather(api.search(query, limit=limit))

  # Extrai e imprime URLs
  tweet_urls = [tweet.url for tweet in tweets]

  tweet_data = [
    {
      "url": tweet.url,
      "content": tweet.rawContent,
      "date": tweet.date.isoformat(),
      "author": {
        "username": tweet.user.username,
        "name": tweet.user.displayname,
        "avatar": tweet.user.profileImageUrl
      }
    }
    for tweet in tweets
  ]

  return tweet_data

if __name__ == "__main__":
  # Exemplo de uso: python scraper.py "from:Lojas_Renner atendimento lang:pt"
  if len(sys.argv) < 2:
    sys.exit(1)

  query = sys.argv[1]
  posts = asyncio.run(scrape_twitter_posts(query))

  print(json.dumps(posts))