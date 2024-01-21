# ACULEI

Aculei is a web application that shows the images captured by a set of phototraps placed in Umbria, Italy. Aculei aims to show a path through the wood that can be chosen by the user and guided by the AI.

## Web app screenshots

![image](https://private-user-images.githubusercontent.com/95191347/298373134-9c0e6eff-0aba-4be2-9815-1cc6ab082443.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU4Mjk3NzAsIm5iZiI6MTcwNTgyOTQ3MCwicGF0aCI6Ii85NTE5MTM0Ny8yOTgzNzMxMzQtOWMwZTZlZmYtMGFiYS00YmUyLTk4MTUtMWNjNmFiMDgyNDQzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTIxVDA5MzExMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWFjZjczMmRkMDljMWUxMzg5ODRmOWNmOWJhZTIxNWJiOWIzNjkyNTk5MmU4NTUxN2I2YWFkNjdiMzExYTNhMDkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.a1X7EmTFcqpXqDn5zqIZoO_Qs_T--dy4-DxFikQtDng)

![image](https://private-user-images.githubusercontent.com/95191347/298373133-a914253d-6072-4aab-9c25-2a3d9e57a60f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU4Mjk3NzAsIm5iZiI6MTcwNTgyOTQ3MCwicGF0aCI6Ii85NTE5MTM0Ny8yOTgzNzMxMzMtYTkxNDI1M2QtNjA3Mi00YWFiLTljMjUtMmEzZDllNTdhNjBmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTIxVDA5MzExMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE4MTk1NTFlOWU0ZDZlNGRiMTE1ZDMxM2RjNWM3ZjlkY2M1NWI0ZTU3NmYxNDk1NzdmMjk3YWMzMDU0NTNkOWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.G9rO1p-yNKwBazV0oqEsylfBomHIYoMi5r-eSEqJBU8)

![image](https://private-user-images.githubusercontent.com/95191347/298373121-79711b86-6210-4cc8-acd8-6d18fa83050e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU4Mjk3NzAsIm5iZiI6MTcwNTgyOTQ3MCwicGF0aCI6Ii85NTE5MTM0Ny8yOTgzNzMxMjEtNzk3MTFiODYtNjIxMC00Y2M4LWFjZDgtNmQxOGZhODMwNTBlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTIxVDA5MzExMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVlZTNhMzg4YTJlMzNkYjU3NWFmMWRjODU2ZjQ3OTJjMDk2N2E0NzhhZGRjZmEyODkxYTI1NmFjOTY0OGUxNDQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.uOjFhsaxduyEwoxdt27nOzdZqROjS8EXwTXwz-FG2Ig)

![image](https://private-user-images.githubusercontent.com/95191347/298373131-094dcbf6-fa2a-4fc9-b36c-ddd3741fcbb2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU4Mjk3NzAsIm5iZiI6MTcwNTgyOTQ3MCwicGF0aCI6Ii85NTE5MTM0Ny8yOTgzNzMxMzEtMDk0ZGNiZjYtZmEyYS00ZmM5LWIzNmMtZGRkMzc0MWZjYmIyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTIxVDA5MzExMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTdlMDc3ZTNlNGJjN2E5YmZiYzE4M2RmNDJkYzhiNjE1YjVlYzAxZjIzMTgyZjU4MzVmMjFmMzRjOGI0NzhlOGImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Qo2E-HyRMPSvsqEuOoRwQyvUFnXd72WmGipMGrHa0QI)

![image](https://private-user-images.githubusercontent.com/95191347/298373132-3d9d7df8-1378-4919-9fa4-010fc9befb93.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU4Mjk3NzAsIm5iZiI6MTcwNTgyOTQ3MCwicGF0aCI6Ii85NTE5MTM0Ny8yOTgzNzMxMzItM2Q5ZDdkZjgtMTM3OC00OTE5LTlmYTQtMDEwZmM5YmVmYjkzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTIxVDA5MzExMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMyN2Q0YjNlZDhkNjg0OGU0OWI3MzQzOTIyMGM1YzI0NDYxMzE5MGFlM2I4ZGE0YzY2YzA1MDAwNWY0OGY5YmEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.fEBXwV0-aSvCKEwd3KzcRd7H6rzt65HL0DbumCdbPDU)
