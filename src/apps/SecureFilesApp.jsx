/**
 * SecureFilesApp — stub.
 * SecureFiles data is already handled by DocVaultApp (Secure Vault tab).
 * This component exists as a placeholder for the secfiles app ID.
 */
export default function SecureFilesApp() {
  return (
    <div className="secfiles-app" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="secfiles-empty">
        <span className="secfiles-empty-icon">&#x1F512;</span>
        <span className="secfiles-empty-text">
          See DocVault — Secure Vault tab
        </span>
      </div>
    </div>
  )
}
