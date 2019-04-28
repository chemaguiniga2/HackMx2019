import twint

# Configure
c = twint.Config()
c.Limit = 20000
c.Username = "El_Universal_Mx"
c.Store_json = True
c.Output = "n.json"
c.Pandas_clean = True  # <=== here to auto-clean at every twint.run.Search(c)

# Run
twint.run.Search(c)
tweets_df = twint.storage.panda.Tweets_df
print(tweets_df)
