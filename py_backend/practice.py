from rdflib import Graph
from tabulate import tabulate

# Load TTL RDF graph from Wikidata
g = Graph()
g.parse("https://www.wikidata.org/wiki/Special:EntityData/Q2831.ttl", format="turtle")

# SPARQL SELECT query
query = """
PREFIX wd: <http://www.wikidata.org/entity/>
SELECT ?predicate ?object
WHERE {
    wd:Q2831 ?predicate ?object .
}

"""

# Run the query
results = g.query(query)

# Convert results to list of rows
table_data = []
for row in results:
    table_data.append([str(row.predicate), str(row.object)])

# Print as a sexy table
print(tabulate(table_data, headers=["Predicate", "Object"], tablefmt="fancy_grid"))
