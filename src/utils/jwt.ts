import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken'

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy/ZNMFygq83QcfVLqYH1
j3GeVx4yMPh4fvMFAFtc+4GCenDr/sErwO/7vIdGo8YrOc2HWH5H/Y3N1ljGF9AN
rsbWNrZgwNDqfkcZRI+7IxG3v1wOU/R0J3eIURUApZsXgX7twgG8oBNfWEb91vK3
rpi0O4IyqjuqAMQq7k7sxn+hGwPjG30CSJa8kQBeBdHmUYch8LQqkklKJqK53Ib6
k1K36hC9BjL0bCmMhcnQOJsa0MY2mR1qjz9RdRWRTz9v3dEVgVxlQbphiT+ImNAW
MLgVXgcz280A86xhTjuiInismIi05ACJXQpGztvOTfYMypF+cbKDeE5SSYYNTJ4u
rwIDAQAB
-----END PUBLIC KEY-----
`

const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAy/ZNMFygq83QcfVLqYH1j3GeVx4yMPh4fvMFAFtc+4GCenDr
/sErwO/7vIdGo8YrOc2HWH5H/Y3N1ljGF9ANrsbWNrZgwNDqfkcZRI+7IxG3v1wO
U/R0J3eIURUApZsXgX7twgG8oBNfWEb91vK3rpi0O4IyqjuqAMQq7k7sxn+hGwPj
G30CSJa8kQBeBdHmUYch8LQqkklKJqK53Ib6k1K36hC9BjL0bCmMhcnQOJsa0MY2
mR1qjz9RdRWRTz9v3dEVgVxlQbphiT+ImNAWMLgVXgcz280A86xhTjuiInismIi0
5ACJXQpGztvOTfYMypF+cbKDeE5SSYYNTJ4urwIDAQABAoIBAQDIlEXAo7cWfebZ
ywNHhZi6ImA3CGkPo6rMHa3zdeXxKKHqS5aqB8pBiUAlXVtov//OboMF0dp2Tbf5
bYAR9vcdxEjxsVVhCZMx8DW3KSo+CLSNKbilc6evEGwsYN0r/2OUZADpY8/eFG8V
X2tOsY9V0rKcOyQcKWS8MC6QAWn0odeCU6ZUNo3l7DycJuwRO9mb/k6/wJsH9v3a
DSUxnWk9BzAvV82pbNjMoLVRCPELPqoEQL77xg9sxg/ehEEINGJjdTLvHTJP6bRf
l0z8zWfkFlRZAeXHiXLH81K5kjKwOConNs1yGz3UyK95lTEAlY2u+jC3SoE7G+GX
IZUysISRAoGBAPuxS7wr38pCn/hvBSaQmcB0y5TJoy8XkwwKXPJ7tezqV2VmW5MN
KMXteNUDO81XVjJLoQDt7SeLQKpmgbeWL/n83It82NMdm6rjhC/V+cdkQ6Qntw1d
vds27bxhSkqvubfdcz6qKVNeGyoVE8wC/3QGpUcF1fyj9DTPZ76MWI0lAoGBAM9z
5CTnIFQanDd44le36y6Dl3tlr0QqfelTj1IclwScJnZPBayBjs7lrBPir48d/s/l
xl4YKYEmwJ08VdcdikxjGQp5Iil9DflZZdl80N8K3wDUOczkhporRWn38RQSgdcX
+pWLzDNZr5T1kPYv1PG81EAPBXX1KjOEm6ITeuZDAoGAff5/4h+4dICroeq5klea
kAwniUDzDnTnqIRbiQtCw+l/fIQj3VYeDg7ViRSIUD+jJ6RSYau5Jy1/Xo3X67Yk
KClbofwKcoyEy6P/HQ8pbZYUgk1bRjah/uXdVosBbKfQ+WjC8yCtdU1LneJVObBa
fpOBEy+pskHE0tbsoSeSgH0CgYBOOI1ymK9o5uu2Qt9dYdzMmhOZFJtEYZ0+SCKH
PH5434PlIiCqjeNSAemjSdsWZKH6s9HbEtM7fmgsIV7gkKPf75G2kDwgVqXZOisc
GWMMZqX1QxBUQGq8YMp4jWOaROwuNT1n++FQD2YUDY/OM/Tf/WouiTtu4bU63apt
L1kszwKBgE0mES1h+QI6aChIdx/95pOcNfroQp5e5qnUaFjOlDB92zgr1bLp9gsB
bSwKF+AkYRj/rfasEJCp/j6ie3IqsbTm4Yb4k1ORcKY0k1NHmhvA3fjjWEcNDD+9
Vh/84PNiFc2GMvXwP8w9P1YPrFnjO776fXKukAxKfe7Lt6FGVJPL
-----END RSA PRIVATE KEY-----
`

export const signJwt = (payload: object, options: SignOptions) => {
    return jwt.sign(payload, PRIVATE_KEY, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export const verifyJwt = (token: string): { decoded: JwtPayload | null, expired: boolean } => {
    try {
        const decoded = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        }) as JwtPayload
        return { decoded, expired: false }
    } catch (error) {
        return { decoded: null, expired: true }
    }
}