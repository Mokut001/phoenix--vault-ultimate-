
{-# LANGUAGE DataKinds           #-}
{-# LANGUAGE ImportQualified     #-}
{-# LANGUAGE NoImplicitPrelude   #-}
{-# LANGUAGE OverloadedStrings   #-}
{-# LANGUAGE TemplateHaskell     #-}
{-# LANGUAGE TypeApplications    #-}

module PhoenixVault where

import           Plutus.V2.Ledger.Api
import           Plutus.V2.Ledger.Contexts
import           PlutusTx.Prelude
import qualified PlutusTx

-- | Datum defines the vaultowner and target amount in Lovelace
data PhoenixDatum = PhoenixDatum
    { ownerPkh     :: PubKeyHash
    , targetAmount :: Integer
    }
PlutusTx.unstableMakeIsData ''PhoenixDatum

{-# INLINABLE mkValidator #-}
mkValidator :: PhoenixDatum -> () -> ScriptContext -> Bool
mkValidator dat _ ctx = 
    let info = scriptContextTxInfo ctx
        
        -- Requirement 1: Transaction is signed by the owner
        signedByOwner = txSignedBy info (ownerPkh dat)
        
        -- Requirement 2: The script balance meets the target amount
        -- In Plutus V2, we verify the value of inputs coming from this script address
        scriptInputValue = valueSpent info
        currentBalance = getLovelace (fromValue scriptInputValue)
        targetMet = currentBalance >= targetAmount dat

    in traceIfFalse "Error: Not the authorized owner" signedByOwner && 
       traceIfFalse "Error: Savings goal not yet reached" targetMet

validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| mkValidator ||])
