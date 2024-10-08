import { useRoute } from 'vue-router'

export function useFunc(model) {
  const isCredType = ({ params }) => {
    const type = params[1] || ''
    const key = 'schema/type'
    if (model.value[key] === type) return true
    else return false
  }

  const isUpdateForm = () => {
    const route = useRoute()
    return route.path.split('/').pop() === 'edit'
  }

  function setCredentialType() {
    const credList = [
      {
        provider: 'eks',
        credType: 'Aws'
      },
      {
        provider: 'aks',
        credType: 'Azure'
      },
      {
        provider: 'gke',
        credType: 'GoogleCloud'
      },
      {
        provider: 'digitalocean',
        credType: 'DigitalOcean'
      },
      {
        provider: 'linode',
        credType: 'Linode'
      },
      {
        provider: 'rancher',
        credType: 'Rancher'
      }
    ]
    const route = useRoute()
    const { query } = route || {}
    const { provider } = query || {}
    const cred = credList.find((el) => el.provider === provider)
    if (cred) return cred.credType
    else return ''
  }

  return { isCredType, isUpdateForm, setCredentialType }
}
